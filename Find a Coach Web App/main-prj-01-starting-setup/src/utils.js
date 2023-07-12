export const convertStringToJSON = (str) => {
  const rawDataByRows = str.split("\n");

  const propNames = rawDataByRows.shift().split(",");

  rawDataByRows.reduce((acc, value) => {
    const rawArrayUserData = value.split(",");

    const coachData = {};
    let areaPropHelper = {
      isAreaStart: false,
      lastIndex: null,
    };

    for (let i = 0; i < rawArrayUserData.length; i++) {
      let propKey = propNames[i];
      let propValue = rawArrayUserData[i];

      if (propValue.includes("[")) {
        areaPropHelper.isAreaStart = true;
        areaPropHelper.startIndex = i;
        propKey = propKey.split("[").pop();
        coachData.area = [];
        coachData.area.push(propValue);
        continue;
      }

      if (areaPropHelper.isAreaStart) {
        const isLastElement = propValue.includes("]");

        if (!isLastElement) {
          coachData.area.push(propValue);
        } else {
          propValue = propValue.split("]").unshift();
        }
      }

      coachData[propKey] = propValue;

      console.log(coachData, acc);
    }
  }, []);

  //   const columnsTitles = {};
};
