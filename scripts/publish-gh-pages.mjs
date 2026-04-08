import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
    ...options,
  }).trim();
}

function ghApi(path, { method = 'GET', payload } = {}) {
  const args = ['api', path];
  if (method !== 'GET') {
    args.push('--method', method);
  }
  if (payload) {
    args.push('--input', '-');
    return JSON.parse(run('gh', args, { input: JSON.stringify(payload) }) || '{}');
  }
  return JSON.parse(run('gh', args) || '{}');
}

function collectFiles(directory) {
  const entries = [];

  for (const name of readdirSync(directory)) {
    const fullPath = join(directory, name);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      entries.push(...collectFiles(fullPath));
      continue;
    }

    entries.push(fullPath);
  }

  return entries;
}

function parseRemote(remoteUrl) {
  const normalized = remoteUrl.replace(/\.git$/, '');
  const match = normalized.match(/github\.com[:/](.+?)\/(.+)$/);

  if (!match) {
    throw new Error(`无法从远程地址解析 owner/repo：${remoteUrl}`);
  }

  return { owner: match[1], repo: match[2] };
}

function main() {
  const remoteUrl = run('git', ['remote', 'get-url', 'origin']);
  const { owner, repo } = parseRemote(remoteUrl);
  const repository = `${owner}/${repo}`;
  const siteUrl = `https://${owner}.github.io`;

  console.log(`Building site for ${repository}...`);
  const buildEnv = {
    ...process.env,
    GITHUB_REPOSITORY: repository,
    GITHUB_REPOSITORY_OWNER: owner,
    SITE_URL: siteUrl,
  };

  if (process.platform === 'win32') {
    execFileSync('cmd.exe', ['/d', '/s', '/c', 'npm run build'], {
      cwd: rootDir,
      stdio: 'inherit',
      env: buildEnv,
    });
  } else {
    execFileSync('npm', ['run', 'build'], {
      cwd: rootDir,
      stdio: 'inherit',
      env: buildEnv,
    });
  }

  const mainRef = ghApi(`repos/${repository}/git/ref/heads/main`);
  const parentSha = mainRef.object.sha;

  const treeEntries = collectFiles(distDir).map((filePath) => {
    const blob = ghApi(`repos/${repository}/git/blobs`, {
      method: 'POST',
      payload: {
        content: readFileSync(filePath).toString('base64'),
        encoding: 'base64',
      },
    });

    return {
      path: relative(distDir, filePath).replace(/\\/g, '/'),
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    };
  });

  const nojekyllBlob = ghApi(`repos/${repository}/git/blobs`, {
    method: 'POST',
    payload: {
      content: '',
      encoding: 'utf-8',
    },
  });

  treeEntries.push({
    path: '.nojekyll',
    mode: '100644',
    type: 'blob',
    sha: nojekyllBlob.sha,
  });

  const tree = ghApi(`repos/${repository}/git/trees`, {
    method: 'POST',
    payload: { tree: treeEntries },
  });

  const commit = ghApi(`repos/${repository}/git/commits`, {
    method: 'POST',
    payload: {
      message: 'chore: publish site to github pages',
      tree: tree.sha,
      parents: [parentSha],
    },
  });

  let branchExists = true;
  try {
    ghApi(`repos/${repository}/git/ref/heads/gh-pages`);
  } catch {
    branchExists = false;
  }

  if (branchExists) {
    ghApi(`repos/${repository}/git/refs/heads/gh-pages`, {
      method: 'PATCH',
      payload: {
        sha: commit.sha,
        force: true,
      },
    });
  } else {
    ghApi(`repos/${repository}/git/refs`, {
      method: 'POST',
      payload: {
        ref: 'refs/heads/gh-pages',
        sha: commit.sha,
      },
    });
  }

  ghApi(`repos/${repository}/pages`, {
    method: 'PUT',
    payload: {
      build_type: 'legacy',
      source: {
        branch: 'gh-pages',
        path: '/',
      },
    },
  });

  ghApi(`repos/${repository}/pages/builds`, {
    method: 'POST',
  });

  console.log(`Published to ${siteUrl}/${repo}/`);
}

main();
