import { bugReport } from "./templates/bug.js";
import { createIssue } from "./services/githubService.js";
import "dotenv/config";

const run = async () => {
  const body = bugReport("Sample error message", "1. Step one\n2. Step two");

  const issue = await createIssue("Bug: Sample Issue", body, [
    "bug",
    "auto-generated",
  ]);

  console.log("Created Issue:", issue.html_url);
};

run();
