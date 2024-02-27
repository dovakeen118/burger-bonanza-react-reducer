import _ from 'lodash'

const translateServerErrors = (errors) => {
  let serializedErrors = {}

  Object.keys(errors).forEach((key) => {
    errors[key].forEach((error) => {
      const field = _.startCase(key)
      serializedErrors = {
        ...serializedErrors,
        [field]: error.message
      }
    })
  });
  return serializedErrors
};

export default translateServerErrors;
