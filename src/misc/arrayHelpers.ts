function isEmptyObj(obj) {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === "{}";
}

export function sortArray(data: Array<{}>, field: string, dir: "asc" | "desc"): void {
  data.sort((a: {}, b: {}) => {
    const aValue = a[field] ? a[field].toString().toLowerCase() : "";
    const bValue = b[field] ? b[field].toString().toLowerCase() : "";
    if (aValue > bValue) {
      return dir === "asc" ? 1 : -1;
    }
    if (aValue < bValue) {
      return dir === "asc" ? -1 : 1;
    }
    return 0;
  });
}


function isMatch() {
  let fieldVal = filterFields[fieldName];
  if (fieldVal == null || fieldVal == undefined) {
    fieldVal = '';
  }
  const fieldSearchText = fieldVal.toString().toLowerCase();
  const dataFieldValue = item[fieldName];
  if (dataFieldValue == null) {
    return false;
  }
  const currentIsMatched = dataFieldValue
    .toString()
    .toLowerCase()
    .includes(fieldSearchText);
  return previousMatched || currentIsMatched;
}

export function filterArray(
  data: Array<{}>,
  filterFields: { [field: string]: string }
): Array<{}> {
  if (isEmptyObj(filterFields)) {
    return data;
  }
  const fieldNames = Object.keys(filterFields);
  return data.filter((item) =>
    fieldNames.reduce((previousMatched, fieldName) => {

      if (fieldName.length > 2 && fieldName[0] === 'q' && fieldName[1] === '|') {
        let fieldVal = filterFields[fieldName];
        if (fieldVal == null || fieldVal == undefined) {
          fieldVal = '';
        }
        const fieldSearchText = fieldVal.toString().toLowerCase();

        return fieldName.split('|').reduce((previousMatched, subFieldName) => {
          const dataFieldValue = item[subFieldName];
          if (dataFieldValue == null) {
            return false;
          }
          const currentIsMatched = dataFieldValue
            .toString()
            .toLowerCase()
            .includes(fieldSearchText);
          return previousMatched || currentIsMatched;
        })

      } else {

        let fieldVal = filterFields[fieldName];
        if (fieldVal == null || fieldVal == undefined) {
          fieldVal = '';
        }
        const fieldSearchText = fieldVal.toString().toLowerCase();
        const dataFieldValue = item[fieldName];
        if (dataFieldValue == null) {
          return false;
        }
        const currentIsMatched = dataFieldValue
          .toString()
          .toLowerCase()
          .includes(fieldSearchText);
        return previousMatched || currentIsMatched;
      }

    }, false)
  );
}