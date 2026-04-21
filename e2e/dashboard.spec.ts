import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard before each test
    await page.goto('/');
  });

  test('should load the dashboard page', async ({ page }) => {
    // Check that the page title contains the expected text
    await expect(page).toHaveTitle(/NCM Dashboard/);
  });

  test('should display the sidebar navigation', async ({ page }) => {
    // Check for sidebar elements
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Check for navigation links
    const navLinks = page.locator('a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should display the header with title', async ({ page }) => {
    // Check for header
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for dashboard title
    const title = page.locator('h1');
    await expect(title).toContainText(/Vue d'ensemble/);
  });

  test('should display all three dashboard cards', async ({ page }) => {
    // Get all cards by looking for h2 elements (card titles)
    const cardTitles = page.locator('h2');

    // Should have at least 3 cards
    const titleCount = await cardTitles.count();
    expect(titleCount).toBeGreaterThanOrEqual(3);

    // Check for specific card titles
    await expect(page.locator('text=Aperçu des opérations')).toBeVisible();
    await expect(page.locator('text=Situation de caisse')).toBeVisible();
    await expect(page.locator('text=Statut du parc et des expéditions')).toBeVisible();
  });

  test('should display operations overview metrics', async ({ page }) => {
    // Check for the three main metrics in operations card
    const expeditionsText = page.locator('text=Expéditions du jour');
    const voyagesText = page.locator('text=Voyages en cours');
    const anomaliesText = page.locator('text=Anomalies en attente');

    await expect(expeditionsText).toBeVisible();
    await expect(voyagesText).toBeVisible();
    await expect(anomaliesText).toBeVisible();
  });

  test('should display caisse dashboard with amounts', async ({ page }) => {
    // Check for caisse section headings
    await expect(page.locator('text=Recettes du jour')).toBeVisible();
    await expect(page.locator('text=Dépenses du jour')).toBeVisible();
    await expect(page.locator('text=Solde courant')).toBeVisible();

    // Check for action buttons
    await expect(page.locator('text=Ouvrir Caisse')).toBeVisible();
    await expect(page.locator('text=Enregistrer Dépense')).toBeVisible();
  });

  test('should display fleet status table', async ({ page }) => {
    // Check for fleet summary metrics
    await expect(page.locator('text=Total véhicules')).toBeVisible();
    await expect(page.locator('text=Disponibles')).toBeVisible();
    await expect(page.locator('text=En transit')).toBeVisible();
    await expect(page.locator('text=En maintenance')).toBeVisible();

    // Check for table headers
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Check for column headers
    await expect(page.locator('th')).toContainText(/Itinéraire|Véhicule|Conducteur|Colis|Statut/);
  });

  test('should have working navigation links', async ({ page }) => {
    // Click on a navigation link and verify page doesn't break
    const navLink = page.locator('a:has-text("Vue d\'ensemble")');
    
    // The link should exist
    await expect(navLink).toBeVisible();

    // Link should be clickable
    await expect(navLink).toBeEnabled();
  });

  test('should display badges for status indicators', async ({ page }) => {
    // Look for badge elements (status indicators)
    const badges = page.locator('span[style*="border-radius"][style*="9999"]');
    const badgeCount = await badges.count();

    // Should have multiple badges for various statuses
    expect(badgeCount).toBeGreaterThan(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that main content is still visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Cards should still be visible
    await expect(page.locator('text=Aperçu des opérations')).toBeVisible();
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check for header landmark
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for aside landmark (sidebar)
    const aside = page.locator('aside');
    await expect(aside).toBeVisible();

    // Check for table structure
    const table = page.locator('table');
    const thead = table.locator('thead');
    const tbody = table.locator('tbody');

    await expect(thead).toBeVisible();
    await expect(tbody).toBeVisible();
  });
});
