const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // For cards with data-program-id="prog-X"
  content = content.replace(/(<div[^>]*class="[^"]*program-card-item[^"]*"[^>]*data-program-id="(prog-\d+)"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/g, (match, block, progId) => {
    return block.replace(/href="program-details\.html"/g, `href="program-details.html?id=${progId}"`);
  });

  // For admin or parent table rows or cards with data-program-id
  content = content.replace(/(<tr[^>]*data-program-id="(prog-\d+)"[\s\S]*?<\/tr>)/g, (match, block, progId) => {
    return block.replace(/href="(\.\.\/)?program-details\.html"/g, (m, prefix) => `href="${prefix || ''}program-details.html?id=${progId}"`);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', filePath);
}

updateFile('programs.html');
updateFile('index.html');
updateFile('home-2.html');
updateFile('admin/programs.html');
updateFile('parent/programs.html');
