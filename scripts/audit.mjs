import { chromium } from '@playwright/test';

async function runAudit() {
  const isHeaded = process.argv.includes('--headed') || process.env.HEADED === 'true' || true;
  console.log(`\n🔍 Starting Autonomous Playwright Audit on http://localhost:9000 (Headed mode: ${isHeaded})...\n`);
  
  // Launch visible browser window with slowMo delay so you can watch actions live
  const browser = await chromium.launch({ 
    headless: !isHeaded, 
    slowMo: isHeaded ? 600 : 0 
  });
  const report = {
    pagesTested: [],
    consoleErrors: [],
    pageErrors: [],
    brokenLinks: [],
    brokenImages: [],
    overflowIssues: [],
    modalsTested: [],
    responsiveChecks: []
  };

  const pagesToVisit = ['http://localhost:9000/', 'http://localhost:9000/projects', 'http://localhost:9000/about'];

  // 1. Desktop Audit (1280x800)
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      report.consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  page.on('pageerror', err => {
    report.pageErrors.push({ url: page.url(), message: err.message });
  });

  for (const url of pagesToVisit) {
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      const status = response ? response.status() : 'No response';
      const title = await page.title();

      // Check horizontal layout overflow
      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasHorizontalScrollbar) {
        report.overflowIssues.push({ url, viewport: 'Desktop (1280x800)' });
      }

      // Check broken links on page
      const links = await page.$$eval('a', els => els.map(e => e.href));
      const uniqueLinks = [...new Set(links)];

      for (const link of uniqueLinks) {
        if (link.startsWith('http://localhost:9000')) {
          try {
            const linkResp = await page.request.get(link);
            if (!linkResp.ok()) {
              report.brokenLinks.push({ source: url, target: link, status: linkResp.status() });
            }
          } catch (e) {
            report.brokenLinks.push({ source: url, target: link, error: e.message });
          }
        }
      }

      // Check broken images on page
      const images = await page.$$eval('img', els => els.map(e => ({ src: e.src, complete: e.complete, naturalWidth: e.naturalWidth })));
      for (const img of images) {
        if (!img.complete || img.naturalWidth === 0) {
          report.brokenImages.push({ page: url, src: img.src });
        }
      }

      report.pagesTested.push({ url, status, title, linksCount: uniqueLinks.length, imagesCount: images.length });
    } catch (err) {
      report.pagesTested.push({ url, error: err.message });
    }
  }

  // 2. Test Project Modal Interaction
  try {
    await page.goto('http://localhost:9000/', { waitUntil: 'networkidle' });
    const projectCard = page.locator('article, .border').first();
    if (await projectCard.isVisible()) {
      await projectCard.click();
      await page.waitForTimeout(300);
      const modalCount = await page.locator('[role="dialog"], .fixed').filter({ hasText: /project|github|demo|built with/i }).count();
      report.modalsTested.push({ action: 'Clicked featured project card', modalOpened: modalCount > 0 });
    }
  } catch (e) {
    report.modalsTested.push({ error: e.message });
  }

  await context.close();

  // 3. Mobile Viewport Audit (375x667 - Mobile)
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();

  for (const url of pagesToVisit) {
    await mobilePage.goto(url, { waitUntil: 'networkidle' });
    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    report.responsiveChecks.push({
      url,
      viewport: 'Mobile (375x667)',
      hasHorizontalOverflow,
      navVisible: await mobilePage.locator('nav').isVisible()
    });
    await mobilePage.waitForTimeout(1000);
  }

  await mobileContext.close();
  await browser.close();

  // Printable Summary
  console.log('--------------------------------------------------');
  console.log('✅ AUDIT COMPLETE - RESULTS SUMMARY:');
  console.log('--------------------------------------------------');
  console.log('📄 Pages Crawled:', report.pagesTested.map(p => `${p.url} [Status ${p.status} - "${p.title}"]`).join('\n   '));
  console.log('\n🔗 Broken Links:', report.brokenLinks.length === 0 ? 'None (All links healthy)' : JSON.stringify(report.brokenLinks, null, 2));
  console.log('🖼️ Broken Images:', report.brokenImages.length === 0 ? 'None (All images healthy)' : JSON.stringify(report.brokenImages, null, 2));
  console.log('⚠️ Console Errors:', report.consoleErrors.length === 0 ? 'None (Clean console)' : JSON.stringify(report.consoleErrors, null, 2));
  console.log('📐 Layout Overflows:', report.overflowIssues.length === 0 ? 'None (No horizontal scrollbar issues)' : JSON.stringify(report.overflowIssues, null, 2));
  console.log('📱 Mobile Viewport Check (375x667):', report.responsiveChecks.map(r => `${r.url} -> Nav Visible: ${r.navVisible}, Overflow: ${r.hasHorizontalOverflow}`).join('\n   '));
  console.log('🎯 Modal Interaction Test:', report.modalsTested);
  console.log('--------------------------------------------------\n');
}

runAudit().catch(err => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
