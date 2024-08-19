const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Path to your documentation directory
const docsDir = path.resolve(__dirname, "docs");

// Helper function to parse "MM-DD-YYYY" date format and convert to timestamp
const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`).getTime();
};

// Helper function to get the "last_update.date" from front matter
const getLastUpdatedDate = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  return data.last_update && data.last_update.date
    ? parseDate(data.last_update.date)
    : 0; // Parse the date and convert to timestamp, use 0 if date is missing
};

// Read all files from the docs directory
const files = fs
  .readdirSync(docsDir)
  .filter((file) => file.endsWith(".md") || file.endsWith(".mdx")) // Only markdown and MDX files
  .filter((file) => file !== "index.md" && file !== "index.mdx") // Exclude the index file
  .map((file) => ({
    file,
    updatedTime: getLastUpdatedDate(path.join(docsDir, file)),
  }))
  .sort((a, b) => b.updatedTime - a.updatedTime); // Sort by "last updated" date (newest first)

module.exports = {
  docs: [
    {
      type: "doc",
      id: "index", // The index page you want to keep at the top
      label: "Home", // Optional label for the index page
    },
    ...files.map((f) => ({
      type: "doc",
      id: f.file.replace(/\.mdx?$/, "").replace(/\.md$/, ""), // Remove the file extension to get the doc ID
    })),
  ],
};
