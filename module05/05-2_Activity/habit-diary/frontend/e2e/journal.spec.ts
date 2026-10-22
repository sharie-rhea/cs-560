import { test, expect } from "@playwright/test";
import { JournalPage } from "./pages/journal.page";

test.describe("Habit Diary", () => {
	let journalPage: JournalPage;

	test.beforeEach(async ({ page }) => {
		journalPage = new JournalPage(page);
		await journalPage.goto();
		await expect(journalPage.appBarTitle).toContainText("Habit Diary");
	});

	// EXAMPLE TEST - Study this implementation to understand the pattern
	test("should add a new journal entry and verify it appears in the list", async () => {
		// Fill out the form and submit
		await journalPage.entryForm.selectActivityType("Social");
		await journalPage.entryForm.fillDescription("Had coffee chat with mentor");
		await journalPage.entryForm.submit();

		// Verify the entry appears in the data table
		await expect(
			journalPage.entryList.getEntryByDescription(
				"Had coffee chat with mentor",
			),
		).toBeVisible();
	});

	// TODO: Complete this test
	test("should filter entries by activity type", async () => {
		// Step 1: Add 3 different entries (provided for you)
		const entries = [
			{ type: "Social", description: "Networking event at tech meetup" },
			{ type: "Education", description: "Completed React course online" },
			{ type: "Career", description: "Practiced behavioral questions" },
		];

		for (const entry of entries) {
			await journalPage.entryForm.addEntry(entry.type, entry.description);
			// Wait for entry to appear before adding the next one
			await expect(
				journalPage.entryList.getEntryByDescription(entry.description),
			).toBeVisible();
		}

		// TODO: Filter by "Career" and verify only Career entries are visible
		// Hint: Use journalPage.entryList.filterByActivityType('Career')
		journalPage.entryList.filterByActivityType("Career");
		// Hint: Use expect(...).toBeVisible() and expect(...).not.toBeVisible()
		// Hint: Check that the Career entry is visible and the other two are NOT visible

		// verify the career entry is visible
		await expect(
			journalPage.entryList.getEntryByDescription(entries[2].description),
		).toBeVisible();

		// verify the social and education entries are not visible
		await expect(
			journalPage.entryList.getEntryByDescription(entries[0].description),
		).not.toBeVisible();
		await expect(
			journalPage.entryList.getEntryByDescription(entries[1].description),
		).not.toBeVisible();
	});

	// TODO: Implement this test AND the getValidationError method in entry-form.component.ts
	test("should show validation error when submitting with empty description", async () => {
		// TODO: Implement this test
		// Steps:
		// 1. Get the initial row count: const initialRowCount = await journalPage.entryList.tableRows.count()
		const initialRowCount = await journalPage.entryList.tableRows.count();

		// 2. Select an activity type (e.g., 'Physical') but do NOT fill the description
		await journalPage.entryForm.selectActivityType("Physical");

		// 3. Click submit using journalPage.entryForm.submit()
		await journalPage.entryForm.submit();

		// 4. Verify the validation error appears using:
		//    await expect(journalPage.entryForm.getValidationError('This field is required')).toBeVisible()
		//    this makes sure the user gets feedback for what is wrong
		await expect(
			journalPage.entryForm.getValidationError("This field is required"),
		).toBeVisible();

		// 5. Verify no new entry was added:
		//    await expect(journalPage.entryList.tableRows).toHaveCount(initialRowCount)
		//    the incomplete entry should not be added, so row count should not change
		await expect(journalPage.entryList.tableRows).toHaveCount(initialRowCount);

		// NOTE: You also need to implement the getValidationError() method in
		// frontend/e2e/components/entry-form.component.ts
	});
});
