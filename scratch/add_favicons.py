import glob
import os
import re

root_favicon_block = '''  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="shortcut icon" href="assets/images/favicon.ico">'''

parent_favicon_block = '''  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="../assets/images/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/apple-touch-icon.png">
  <link rel="manifest" href="../site.webmanifest">
  <link rel="shortcut icon" href="../assets/images/favicon.ico">'''

def process_file(file_path, block):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'assets/images/favicon' in content:
        print(f"Skipping {file_path} (already has favicon)")
        return False

    pattern = re.compile(r'(<title>.*?</title>)', re.IGNORECASE | re.DOTALL)
    match = pattern.search(content)

    if match:
        title_end = match.end()
        # Find newline after title if present
        new_content = content[:title_end] + '\n\n' + block + content[title_end:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
        return True
    else:
        print(f"Error: Could not find <title> in {file_path}")
        return False

def main():
    root_files = glob.glob('*.html')
    parent_files = glob.glob('parent/*.html')

    updated_count = 0
    for f in root_files:
        if process_file(f, root_favicon_block):
            updated_count += 1

    for f in parent_files:
        if process_file(f, parent_favicon_block):
            updated_count += 1

    print(f"\nDone! Successfully updated {updated_count} files.")

if __name__ == '__main__':
    main()
