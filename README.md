# vvalidation
Allows use of decorator based validation. Internally uses [vuelidate 2](https://vuelidate-next.netlify.app/) to perform validation.

## Installation
```bash
$ npm i vvalidation
```

## Usage
> Create your class and put some validation decorators on the properties you want to validate: \
Create validation file (`user.validation.ts`)
```typescript
import {
  BaseValidation, 
  IsOptional,
  IsRequired,
  DefaultValue,
  UseValidation,
} from 'vvalidation';

@UseValidation()
export default class UserValidation extends BaseValidation {
  @IsRequired({
    message: 'The field is required'
  })
  private readonly firstName!: string

  @IsOptional()
  @DefaultValue('last name')
  private readonly lastName!: string
}
```

## Passing options
> The validate function optionally expects a `Options` object as a last parameter:

```typescript
{
  name?: string
  message?: string
  withAsync?: boolean
}
```

## Validation messages
> You can specify validation `message` in the decorator options and that message will be returned in the ValidationError (in the case that validation for this field fails).

```typescript
import {
  BaseValidation, 
  MinLength,
  MaxLength,
  UseValidation,
} from 'vvalidation';

@UseValidation()
export default class TitleValidation extends BaseValidation {
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  private readonly title!: string
}
```


## Usage with Composition API
> Import validation in (`vue script`)
```typescript
import { useVuelidate } from '@vuelidate/core';

import { IValidationData, IBaseValidation } from 'vvalidation';

import UserValidation from './user.validation.ts';

export default defineComponent({
  setup() {
    const userValidation: IBaseValidation = new UserValidation();

    const { rules, state }: IValidationData = userValidation.getData();
    const reactiveState = reactive(state);

    const v$ = useVuelidate(rules, reactiveState);

    return { v$ };
  },
});
```
## Use in vue template
```html
<template>
  <div>
    <input type="text" v-model="v$.firstName.$model">
    <p>
      {{ v$.firstName.$errors[0]?.$message }}
    </p>
  </div>
  <div>
    <input type="text" v-model="v$.lastName.$model">
    <p>
      {{ v$.lastName.$errors[0]?.$message }}
    </p>
  </div>
</template>
```

## Validation decorators

<!-- Disable table formatting because Prettier messing it up. -->
<!-- prettier-ignore -->
| Decorator                                       | Description |
| ------------------------------------------------| ----------- |
| **Common class decorators**                     | |
| `@UseValidation()`                              | Creates the `rules` and the `state`, it is obligatory to use. |
| **Common validation decorators**                | |
| `@DefaultValue()`                               | Filled field default value. |
| `@IsOptional()`                                 | Optional field / non-required. |
| `@IsRequired()`                                 | Requires non-empty data. Checks for empty arrays and strings containing only whitespaces. |
| `@RequiredIf()`                                 | Requires non-empty data, only if provided data property, ref, or a function resolve to true. |
| `@RequiredUnless()`                             | Requires non-empty data, only if provided data property, ref, or a function resolve to false.|
| `@Not()`                                        | Passes when provided validator would not pass, fails otherwise. Can be chained with other validators. |
| `@Or()`                                         | Passes when at least one of the provided validators returns `true`. Validators can return more data, when using the object response. Can also accept a mix of sync and async validators. |
| `@And()`                                        | Passes when all of provided validators return `true`. Can also accept a mix of sync and async validators. |
| `@SameAs()`                                     | Checks for equality with a given property. Accepts a ref, a direct reference to a data property, or a raw value to compare to it directly. |
| **Type validation decorators**                  | |
| `@IsInteger()`                                  | Accepts positive and negative integers. |
| **String validation decorators**                | |
| `@IsAlpha()`                                    | Accepts only alphabet characters. |
| `@IsAlphaNnumeric()`                            | Accepts only alphanumerics. |
| `@IsNumeric()`                                  | Accepts only numerics. String numbers are also numeric. |
| `@IsDecimal()`                                  | Accepts positive and negative decimal numbers. |
| `@IsEmail()`                                    | Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email.|
| `@IsMACAddress()`                               | Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Provide empty separator  to validate MAC addresses like 00ff1122334455. |
| `@IsIPAddress()`                                | Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1. |
| `@IsUrl()`                                      | Accepts only URLs. |
| `@MinLength()`                                  | Requires the input value to have a minimum specified length, inclusive. Works with arrays, objects and strings. |
| `@MaxLength()`                                  | Requires the input value to have a maximum specified length, inclusive. Works with arrays, objects and strings. |
| `@Between()`                                    | Checks if a number or Date is in specified bounds. min and max are both inclusive. |
| `@MinValue()`                                   | Requires entry to have a specified minimum numeric value or Date. |
| `@MaxValue()`                                   | Requires entry to have a specified maximum numeric value or Date. |
