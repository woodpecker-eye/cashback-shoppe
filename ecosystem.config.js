module.exports = {
    apps: [
        {
            name: 'shoback',
            script: 'bin/www',
            exec_mode: 'fork',
            instances: 1,
            restart_delay: 10000,
            autorestart: true,
            watch: false,
            time: true,
            env: {
                PORT: 8090
            }
        },
    ],

    deploy: {
        production: {
            user: 'root',
            host: '209.97.175.140',
            ref: 'origin/main',
            repo: 'git@github.com:woodpecker-eye/cashback-shoppe.git',
            ssh_options: ['ForwardAgent=yes', 'PasswordAuthentication=no', 'StrictHostKeyChecking=no'],
            path: '/opt/shoback',
            "post-deploy": "npm install && pm2 reload shoback"
        },
    }
};