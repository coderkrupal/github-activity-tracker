import minimist from "minimist";
import { bugReport } from "./templates/bug.js";
import { featureRequest } from "./templates/feature.js";
import { securityIssue } from "./templates/security.js";
import { createIssue } from "./services/githubService.js";
import { cleanText } from "./utils/formatter.js";
import "dotenv/config";


// Read CLI arguments
const args = minimist(process.argv.slice(2));

// Validate required args
if (!args.type) {
  console.error("❌ Error: Issue type is required. Example:");
  console.error("   --type bug | feature | security");
  process.exit(1);
}

// Build the issue content based on type
let title = "";
let body = "";

switch (args.type) {
  case "bug":
    if (!args.error || !args.steps) {
      console.error("❌ Bug issue requires: --error and --steps");
      process.exit(1);
    }
    title = `Bug: ${args.error}`;
    body = bugReport(cleanText(args.error), cleanText(args.steps));
    break;

  case "feature":
    if (!args.feature || !args.reason) {
      console.error("❌ Feature issue requires: --feature and --reason");
      process.exit(1);
    }
    title = `Feature: ${args.feature}`;
    body = featureRequest(cleanText(args.feature), cleanText(args.reason));
    break;

  case "security":
    if (!args.vulnerability || !args.risk) {
      console.error("❌ Security issue requires: --vulnerability and --risk");
      process.exit(1);
    }
    title = `Security: ${args.vulnerability}`;
    body = securityIssue(cleanText(args.vulnerability), cleanText(args.risk));
    break;

  default:
    console.error("❌ Invalid type. Use: bug | feature | security");
    process.exit(1);
}

// Create issue on GitHub
console.log("⏳ Creating issue on GitHub...");

createIssue(title, body, [args.type, "auto-generated"])
  .then((issue) => {
    if (issue.html_url) {
      console.log(`✅ Issue Created: ${issue.html_url}`);
    } else {
      console.error("❌ GitHub API Error:", issue);
    }
  })
  .catch((err) => console.error("❌ Error:", err));
