const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("user choose date", async function (string) {
  return await clickElement(this.page, "a:nth-child(2)");
});

When("user choose time", async function (string) {
  return await clickElement(
    this.page, ".movie-seances__time[href='#'][data-seance-id='217']",
  );
});

When("user choose first seat", async function () {
  return await clickElement(this.page, "div:nth-child(7) span:nth-child(4)");
});

When("user choose second seat", async function () {
  return await clickElement(this.page, "div:nth-child(7) span:nth-child(5)");
});

When("user choose third seat", async function () {
  return await clickElement(this.page, "div:nth-child(6) span:nth-child(5)");
});

When("user choose fourth seat", async function () {
  return await clickElement(this.page, "div:nth-child(6) span:nth-child(4)");
});

When("user choose unavailable seat", async function () {
  return await clickElement(this.page, "div:nth-child(8) span:nth-child(4)");
});

When("user presses a booking button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("valid booking {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = "Вы выбрали билеты:";
  await expect(actual).contains(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    }),
  );
  const expected = await string;
  expect(actual).contains(expected);
});