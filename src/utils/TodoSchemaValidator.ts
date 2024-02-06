import { array, boolean, number, object, string } from "yup";

const TodoSchemaValidator = (importedObject: unknown) => {
  console.log(importedObject)
  const jsonSchema = array().of(
    object().shape({
      id: number().required(),
      title: string().required(),
      completed: boolean().required(),
      content: string().required(),
    })
  );

  try {
    const validObject = jsonSchema.validateSync(importedObject);
    return validObject;
  } catch (error) {
    throw new Error('Invalid object');
  }

}

export default TodoSchemaValidator;