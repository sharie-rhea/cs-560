import { type Page, type Locator } from '@playwright/test'

export class EntryListComponent {
  readonly page: Page
  readonly root: Locator
  readonly filterSelect: Locator
  readonly dataTable: Locator
  readonly tableRows: Locator
  readonly loadingIndicator: Locator
  readonly noDataAlert: Locator

  constructor(page: Page, root: Locator) {
    this.page = page
    this.root = root
    this.filterSelect = root.locator('.v-card-title .v-select')
    this.dataTable = root.locator('.v-data-table')
    this.tableRows = this.dataTable.locator('tbody tr')
    this.loadingIndicator = root.locator('.v-progress-linear')
    this.noDataAlert = this.dataTable.getByText('No entries found')
  }

  async filterByActivityType(activityType: string) {
    await this.filterSelect.click()
    await this.page.getByRole('option', { name: activityType }).click()
  }

  async clearFilter() {
    await this.filterSelect.click()
    await this.page.getByRole('option', { name: 'All' }).click()
  }

  async deleteEntry(description: string) {
    const row = this.dataTable.locator('tr', { hasText: description })
    await row.getByRole('button').click()
  }

  getEntryByDescription(description: string): Locator {
    return this.dataTable.getByText(description)
  }

  getActivityTypeChip(activityType: string): Locator {
    return this.dataTable.locator('.v-chip', { hasText: activityType })
  }
}
