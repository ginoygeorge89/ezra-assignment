class DashboardPage {
  constructor(page) {
    this.page = page;
    this.bookScanBtn = page.locator('button:has-text("Book a scan")');
    this.medicalQuestionnaireCard = page.locator('text=Medical Questionnaire');
    this.startQuestionnaireBtn = page.locator('button:has-text("Start")');
  }

  async isLoaded() {
    await this.bookScanBtn.waitFor();
  }

  async openMedicalQuestionnaire() {
    await this.startQuestionnaireBtn.click();
  }
}

module.exports = { DashboardPage };
