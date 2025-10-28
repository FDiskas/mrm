const fs = require('fs');
const { lines } = require('mrm-core');

const LOCK_FILES = [
    'package-lock.json', // npm
    'yarn.lock',         // yarn
    'pnpm-lock.yaml',    // pnpm
	'bun.lock',          // bun
];

module.exports = function task() {
    const remove = ['node_modules'];
    
    const add = [
        'node_modules/',
        '.DS_Store',
        'Thumbs.db',
        '.idea/',
        '.vscode/',
        '*.sublime-project',
        '*.sublime-workspace',
        '*.log',
        '.env*',
    ];
    
    // Find the one lock file that exists in the project
    const existingLockFile = LOCK_FILES.find(file => fs.existsSync(file));

    if (existingLockFile) {
        remove.push(existingLockFile);
		
        LOCK_FILES.filter(file => file !== existingLockFile)
                  .forEach(file => add.push(file));
    }

    // .gitignore
    lines('.gitignore')
        .remove(remove)
        .add(add)
        .save();
};

module.exports.description = 'Adds .gitignore';
