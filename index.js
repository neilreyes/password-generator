#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("1.0.0").description("Simple password generator");
program
    .option("-l, --length <number>", "length of password", "8")
    .option("-s, --save", "save password to passwords.txt")
    .option("-nn, --no-numbers", "remove numbers")
    .option("-ns, --no-symbols", "remove removes")
    .parse();

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

// Save to file
if (save) {
    savePassword(generatedPassword);
}

// Output generated password
log(chalk.green("Generated Password: ") + chalk.bold(generatedPassword));
log(chalk.yellow("Password copied to clipboard"));
