export class FieldSorter {
  // made static in order to not have to new up the class to use
  public static sort(fieldNames: Array<string>, ignoreCase: boolean) {
    return (item1: object, item2: object) =>
      fieldNames
        .map((field: string) => {
          // A-Z sorting
          let direction = 1;

          // if field starts with - then Z-A sorting
          // strip off the - sign from field name
          if (field.substring(0, 1) === '-') {
            direction = -1;
            field = field.substring(1);
          }

          // capture values so as not to change the original array field value
          // important when doing case insensitive searches else items would display in lowercase
          let item1Value = item1[field],
            item2Value = item2[field];

          // if ignoring case and field value is a type of string
          // then call toLocaleLowerCase on both fields.
          // Used toLocaleLowerCase to accord for culture based sorting
          if (ignoreCase === true) {
            if (typeof item1Value === 'string') {
              item1Value = item1Value.toLocaleLowerCase();
            }
            if (typeof item2Value === 'string') {
              item2Value = item2Value.toLocaleLowerCase();
            }
          }

          // item1 is higher = 1, lower = -1, equal = 0
          return item1Value > item2Value ? direction : item1Value < item2Value ? -direction : 0;
        })
        .reduce((item1SortValue: number, item2SortValue: number) => {
          // values will be 1 or 0 based on the map function output.
          // if item1SortValue is 1 and item2SortValue is 0 then item1 goes 1st
          // if item1SortValue is 0 and item2SortValue is 1 then item2 goes 1st
          // if both are equal then item2 will go 1st
          return item1SortValue ? item1SortValue : item2SortValue;
        }, 0);
  }
}
