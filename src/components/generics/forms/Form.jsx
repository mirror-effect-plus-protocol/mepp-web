import React, { createElement, useEffect } from 'react';
import { useLocale } from 'react-admin';
import { useForm } from 'react-hook-form';

import Input from '@components/generics/forms/Input';

/**
 * Form base with react-hook-form
 *
 * @example
 * <Form
 *  submit={submit}
 *  options={{
 *    mode: 'onBlur',
 *    reValidateMode: 'onChange',
 *  }}
 * >
 * {({ errors }) => (
 *  <>
 *    <Input.Email
 *      name="email"
 *      value={email}
 *      placeholder={'placeholder'}
 *      required
 *    />
 *    {errors.email && (
 *      <p role="alert" small>
 *        {errors.email.message}
 *      </p>
 *    )}
 *
 *    <button type="submit">submit</button>
 *  </>
 * )}
 * </Form>
 */
const Form = ({ children, submit, options }) => {
  const { register, handleSubmit, formState, trigger, watch, setValue } =
    useForm(options);
  const locale = useLocale();

  const mapChildren = (child) => {
    if (!React.isValidElement(child) || typeof child.type === 'string') {
      return child;
    }

    if (child.type === React.Fragment) {
      return <>{React.Children.map(child.props.children, mapChildren)}</>;
    }

    if (child.type === Input.FieldSet) {
      return (
        <Input.FieldSet {...child.props}>
          {React.Children.map(child.props.children, mapChildren)}
        </Input.FieldSet>
      );
    }

    if (
      child.type !== Input.Text &&
      child.type !== Input.Email &&
      child.type !== Input.Password &&
      child.type !== Input.Radio
    ) {
      return child;
    }

    return createElement(child.type, {
      ...child.props,
      register,
      errors: formState.errors[child.props.name],
    });
  };

  const childrens = mapChildren(children(formState, watch, setValue, trigger));

  // Force i18n react-hook-forme error after a locale changing
  useEffect(() => {
    if (Object.keys(formState.errors).length) trigger();
  }, [locale, formState.errors, trigger]);

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      {childrens}
    </form>
  );
};

export default React.memo(Form);
