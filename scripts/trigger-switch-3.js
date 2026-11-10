/**
 * Vidvisual Safety Switch 3
 * --------------------------
 * Instantly restores the beloved "Switch 3" UI state (tag: switch-3 at commit a1f11f1)
 * in 1 second without touching any underlying data.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('[Switch 3] Reverting UI back to Switch 3 baseline (commit a1f11f1)...');
  execSync('git checkout switch-3 -- app/layout.js app/page.js app/premium-ui.css app/globals.css app/motion-enhancements.css components/ GEMINI.md', { stdio: 'inherit' });
  
  // Clean up any extra wensity-specific files created in this overhaul if needed
  const extraFiles = [
    path.join(__dirname, '..', 'app', 'wensity-ui.css'),
    path.join(__dirname, '..', 'components', 'WensityComponents.js'),
  ];
  for (const f of extraFiles) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`[Switch 3] Removed ${path.basename(f)}`);
    }
  }

  console.log('[Switch 3] Successfully restored Switch 3 UI in 1 second!');
} catch (e) {
  console.error('[Switch 3] Error triggering switch 3:', e.message);
}
