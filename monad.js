const PersonMonad = person => {
  const ValidMon = failList => {
    return {
      map: ({ f, error }) => {
        if (!f(person)) {
          failList.push(error);
        }
        return ValidMon(failList);
      },
      flatMap: ({ f, error }) => {
        if (!f(person)) {
          failList.push(error);
        }
        return failList;
      },
      value: () => failList
    };
  };

  const Validation = {
    map: f => PersonMonad(f(person)),
    flatMap: f => f(person),
    validation: () => ValidMon([])
  };

  return Object.create(Validation);
};
const Validation = {
  validAge: { f: p => p.age >= 18, error: "Error: age is not valid" },
  validName: { f: p => p.name.length > 3, error: "Error: name is not valid" }
};

console.log(
  PersonMonad({ age: 12, name: "thiago andrade" })
    .validation()
    .map(Validation.validAge)
    .map(Validation.validName)
    .value()
);
