import { type Page, type Locator } from "@playwright/test";

export class EntryFormComponent {
	readonly page: Page;
	readonly root: Locator;
	readonly activityTypeSelect: Locator;
	readonly dateInput: Locator;
	readonly descriptionTextarea: Locator;
	readonly submitButton: Locator;

	constructor(page: Page, root: Locator) {
		this.page = page;
		this.root = root;
		this.activityTypeSelect = root.locator(".v-select");
		this.dateInput = root.locator('input[type="date"]');
		this.descriptionTextarea = root.locator("textarea");
		this.submitButton = root.getByRole("button", { name: "Add Entry" });
	}

	async selectActivityType(activityType: string) {
		await this.activityTypeSelect.click();
		await this.page.getByRole("option", { name: activityType }).click();
	}

	async fillDescription(description: string) {
		await this.descriptionTextarea.fill(description);
	}

	async setDate(date: string) {
		await this.dateInput.fill(date);
	}

	async submit() {
		await this.submitButton.click();
	}

	async addEntry(activityType: string, description: string, date?: string) {
		if (date) {
			await this.setDate(date);
		}
		await this.selectActivityType(activityType);
		await this.fillDescription(description);
		await this.submit();
	}

	// TODO: Implement this method to return a Locator for validation error messages
	//
	// This method should find and return a Locator for the validation error message
	// that appears when form validation fails.
	//
	// Hint: Use this.root.getByText(message) to find the error message within the form
	// Example: return this.root.getByText(message)
	//
	// The validation error message "This field is required" appears below the
	// description field when you try to submit without entering a description.
	getValidationError(message: string): Locator {
		// TODO: Replace this line with the correct implementation
		return this.root.getByText(message);
	}
}
