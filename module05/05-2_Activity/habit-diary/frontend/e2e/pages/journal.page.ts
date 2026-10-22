import { type Page, type Locator } from '@playwright/test'
import { EntryFormComponent } from '../components/entry-form.component'
import { EntryListComponent } from '../components/entry-list.component'

export class JournalPage {
  readonly page: Page
  readonly appBarTitle: Locator
  readonly entryForm: EntryFormComponent
  readonly entryList: EntryListComponent

  constructor(page: Page) {
    this.page = page
    this.appBarTitle = page.locator('.v-app-bar-title')

    this.entryForm = new EntryFormComponent(
      page,
      page.locator('.v-card').filter({ hasText: 'Add Journal Entry' })
    )
    this.entryList = new EntryListComponent(
      page,
      page.locator('.v-card').filter({ hasText: 'Journal Entries' })
    )
  }

  async goto() {
    await this.page.goto('/')
  }
}
