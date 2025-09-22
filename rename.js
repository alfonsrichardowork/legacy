const fs = require("fs");
const path = require("path");

// Change this to the folder where your images are
const folder = "./uploads/productimagecatalogues";

fs.readdirSync(folder).forEach(file => {
  const match = file.match(/^(\d{13})-(.+)\.(\w+)$/);
  if (match) {
    const [_, num, name, ext] = match;
    const newName = `${name}-${num}.${ext}`;
    fs.renameSync(path.join(folder, file), path.join(folder, newName));
    console.log(`Renamed: ${file} → ${newName}`);
  }
});



// UPDATE cover_image
// SET url = REGEXP_REPLACE(
//     url,
//     '^(/uploads/productimage/)([0-9]{13})-(.+)(\.[a-zA-Z0-9]{4,5})$',
//     '\\1\\3-\\2\\4'
// )
// WHERE url REGEXP '^/uploads/productimage/[0-9]{13}-.+\.[a-zA-Z0-9]{4,5}$';