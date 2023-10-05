import {encoded, translations} from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)

function decodeFields(encoded, translations) {
	 const decoded = [];
	 const uniqueIds = new Set();

	 encoded.forEach(item => {
		  const decodedItem = {};
		  for (const key in item) {
				if (item.hasOwnProperty(key)) {
					 const value = item[key];

					 if (key.endsWith("Id") && translations[value]) {
						  const translation = translations[value];
						  decodedItem[key.replace("Id", "")] = translation;
						  uniqueIds.add(value);
					 } else if (["groupId", "service", "formatSize", "ca"].includes(key)) {
						  decodedItem[key] = value;
					 } else {
						  decodedItem[key] = null;
					 }
				}
		  }
		  decoded.push(decodedItem);
	 });

	 return { decoded, uniqueIds: Array.from(uniqueIds) };
}

// Пример использования
const result = decodeFields(encoded, translations);
console.log(result.decoded); // Массив с расшифрованными полями
console.log(result.uniqueIds); // Массив с уникальными id



// console.log(decoded)
