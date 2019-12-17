const chalk = require('chalk')
const fs = require('fs')
const { newShare } = require('@keystone/core/lib/commands/share')

const { CommandSignedIn } = require('../lib/commands')

class ShareCommand extends CommandSignedIn {
  async newShare(action, env) {
    await this.withUserSession(async userSession => {
      const project = await this.getProjectName()
      if (action === 'new') {
        const addedShare = await newShare(userSession, { project, env })

        this.log(
          `Private key to decrypt shared user files :\n▻ ${chalk.yellow(
            addedShare.privateKey
          )}`
        )
      }
    })
  }

  async run() {
    const { args } = this.parse(ShareCommand)

    if (args.action === 'new') {
      this.newShare(args.action, args.env)
    } else {
      this.pull()
    }
  }
}

ShareCommand.description = `Share your file file with a non-blockstack user
`

ShareCommand.examples = [chalk.yellow('$ ks share')]

ShareCommand.args = [
  {
    name: 'action',
    required: true, // make the arg required with `required: true`
    description: 'new || Path to config file', // help description
    hidden: false,
  },
  {
    name: 'env',
    required: false, // make the arg required with `required: true`
    description: 'env you want to add the user in', // help description
    hidden: false,
  },
]

module.exports = ShareCommand
