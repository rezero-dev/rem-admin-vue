// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { logger } from 'rslog'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

const commitRE
  = /^(revert: )?(fix|feat|docs|perf|test|types|style|build|chore|release|refactor|breaking change)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  logger.error(`invalid commit message: "${msg}".

Proper commit message format is required for automated changelog generation.

Examples:

- fix(Button): incorrect style
- feat(Button): incorrect style
- docs(Button): fix typo

Allowed Types:

- fix
- feat
- docs
- perf
- test
- types
- build
- chore
- release
- refactor
- breaking change
`)
  process.exit(1)
}
