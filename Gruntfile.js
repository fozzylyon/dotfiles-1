/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/eduardolundgren/dotfiles/blob/master/LICENSE.md
 *
 * @author Eduardo Lundgren <eduardo.lundgren@gmail.com>
 */

'use strict';

var userhome = require('userhome');
var choices = require('./templates/.osx.json');

module.exports = function(grunt) {

    grunt.initConfig({

        // -- Bump -------------------------------------------------------------

        bump: {

            options: {
                commit: true,
                commitFiles: ['package.json'],
                commitMessage: 'Release v%VERSION%',
                createTag: true,
                files: ['package.json'],
                push: true,
                pushTo: 'origin',
                tagMessage: '',
                tagName: 'v%VERSION%'
            }

        },

        // -- Config -----------------------------------------------------------

        config: {

            git: {
                path_gitconfig: userhome('.dotfiles/.gitconfig'),
                path_gitignore: userhome('.dotfiles/.gitignore_global')
            },

            osx: {
                path_osx: userhome('.dotfiles/.osx')
            },

            ruby: {
                path_build: userhome('.dotfiles/.rbenv/plugins/ruby-build'),
                path_rbenv: userhome('.dotfiles/.rbenv'),
                path_rbenv_system: userhome('.rbenv')
            },

            themes: {
                path_dracula: userhome('.dotfiles/themes/dracula'),
            },

            z: {
                path_z_system: userhome('.z')
            },

            zsh: {
                path_oh_my_zsh: userhome('.dotfiles/.oh-my-zsh'),
                path_plugin_syntax: userhome('.dotfiles/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting'),
                path_theme_dracula: userhome('.dotfiles/.oh-my-zsh/themes/dracula.zsh-theme'),
                path_zshrc: userhome('.dotfiles/.zshrc'),
                path_zshrc_system: userhome('.zshrc')
            }

        },

        // -- Prompt -----------------------------------------------------------

        prompt: {

            config: {
                options: {
                    questions: [
                        {
                            config: 'config.osx.computername',
                            default: 'eduardo',
                            message: 'Which computer name would you like to use?'
                        },
                        {
                            config: 'config.git.name',
                            default: 'Eduardo Lundgren',
                            message: 'Which Git name would you like to use?'
                        },
                        {
                            config: 'config.git.email',
                            default: 'eduardo.lundgren@liferay.com',
                            message: 'Which Git email would you like to use?'
                        },
                        {
                            config: 'config.editor',
                            default: 'subl',
                            message: 'Which editor would you like to use?'
                        },
                        {
                            config: 'config.zsh.plugins',
                            default: 'ant git history-substring-search z zsh-syntax-highlighting',
                            message: 'Which Oh My Zsh plugins would you like to use?'
                        },
                        {
                            config: 'config.zsh.theme_oh_my_zsh',
                            default: 'dracula',
                            message: 'Which Oh My Zsh theme would you like to use?'
                        },
                        {
                            choices: choices,
                            config: 'config.osx.booleans',
                            message: 'Which OSX options would you like to use? (press enter to use default values)',
                            type: 'checkbox'
                        }
                    ]
                }
            }

        },

        // -- Clean ------------------------------------------------------------

        clean: {

            all: {
                options: {
                    force: true
                },
                src: [
                    userhome('.dotfiles'),
                    // TODO - Remove symbolic links
                    '<%= config.ruby.path_rbenv_system %>',
                    '<%= config.z.path_z_system %>',
                    '<%= config.zsh.path_zshrc_system %>'
                ]
            }

        },

        // -- Templates --------------------------------------------------------

        template: {

            git: {
                options: {
                    data: '<%= config %>'
                },
                files: {
                    '<%= config.git.path_gitconfig %>': ['templates/.gitconfig'],
                    '<%= config.git.path_gitignore %>': ['templates/.gitignore_global']
                }
            },

            osx: {
                options: {
                    data: function(config) {
                        config = grunt.config.data.config;

                        choices.forEach(function(choice) {
                            config.osx[choice.value] =
                                config.osx.booleans.indexOf(choice.value) > -1;
                        });

                        return config;
                    }
                },
                files: {
                    '<%= config.osx.path_osx %>': ['templates/.osx']
                }
            },

            zsh: {
                options: {
                    data: '<%= config %>'
                },
                files: {
                    '<%= config.zsh.path_zshrc %>': ['templates/.zshrc']
                }
            }

        },

        // -- Git --------------------------------------------------------------

        gitclone: {

            ruby_rbenv: {
                options: {
                    directory: '<%= config.ruby.path_rbenv %>',
                    repository: 'https://github.com/sstephenson/rbenv.git'
                }
            },

            ruby_build: {
                options: {
                    directory: '<%= config.ruby.path_build %>',
                    repository: 'https://github.com/sstephenson/ruby-build.git'
                }
            },

            oh_my_zsh: {
                options: {
                    directory: '<%= config.zsh.path_oh_my_zsh %>',
                    repository: 'https://github.com/robbyrussell/oh-my-zsh.git'
                }
            },

            theme_dracula: {
                options: {
                    directory: '<%= config.themes.path_dracula %>',
                    repository: 'https://github.com/zenorocha/dracula-theme.git'
                }
            },

            zsh_syntax_highlighting: {
                options: {
                    directory: '<%= config.zsh.path_plugin_syntax %>',
                    repository: 'https://github.com/zsh-users/zsh-syntax-highlighting.git'
                }
            }

        },

        // -- Symbolic links ---------------------------------------------------

        symlink: {

            ruby: {
                dest: '<%= config.ruby.path_rbenv_system %>',
                relativeSrc: '<%= config.ruby.path_rbenv %>'
            },

            sublime: {
                dest: '/usr/local/bin/subl',
                relativeSrc: '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'
            },

            zsh: {
                dest: '<%= config.zsh.path_zshrc_system %>',
                relativeSrc: '<%= config.zsh.path_zshrc %>'
            },

            zsh_theme_dracula: {
                dest: '<%= config.zsh.path_theme_dracula %>',
                relativeSrc: '<%= config.themes.path_dracula %>/zsh/dracula.zsh-theme'
            }

        },

        // -- Exec -------------------------------------------------------------

        shell: {

            osx: {
                command: 'source <%= config.osx.path_osx %>'
            },

            z: {
                command: 'touch <%= config.z.path_z_system %>'
            },

            zsh: {
                command: 'chsh -s /bin/zsh'
            },

            theme_alfred: {
                command: 'open <%= config.themes.path_dracula %>/alfred/Dracula.alfredappearance'
            },

            theme_iterm: {
                command: 'open <%= config.themes.path_dracula %>/iterm/Dracula.itermcolors'
            },

            node_latest: {
                command: 'sudo n latest'
            },

            node_stable: {
                command: 'sudo n stable'
            },

            ruby_compass: {
                command: 'sudo gem install compass'
            },

            ruby_jekyll: {
                command: 'sudo gem install jekyll'
            },

            ruby_update: {
                command: 'sudo gem update --system'
            }

        }

    });

    grunt.task.registerTask('banner', function() {
        console.log(grunt.file.read('templates/.banner'));
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-symlink');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('setup', ['banner', 'prompt', 'clean', 'template', 'gitclone', 'shell', 'symlink']);

};