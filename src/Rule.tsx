import arrayFind from 'array-find';
import React from 'react';
import { RuleProps } from './types';

const renderRemoveRuleAction = ({ controls, translations, classNames, removeRule, level }) => {
  return (
    <controls.removeRuleAction
      label={translations.removeRule.label}
      title={translations.removeRule.title}
      className={`rule-remove ${classNames.removeRule}`}
      handleOnClick={removeRule}
      level={level}
    />
  );
};

const renderValueEditor = ({ controls, translations, classNames, onValueChanged, field, customRenderer, getSelectionKey, level, fieldData, operator, getValueEditorType, value, getInputType, getPlaceHolder, getValues, valueMeta, parentOperator }) => {
  return (
    <controls.valueEditor
    field={field}
    fieldData={fieldData}
    title={translations.value.title}
    operator={operator}
    value={value}
    type={getValueEditorType(field, operator, parentOperator)}
    inputType={getInputType(field, operator)}
    placeHolder={getPlaceHolder(field, operator)}
    values={getValues(field, operator)}
    className={`rule-value ${classNames.value}`}
    handleOnChange={onValueChanged}
    level={level}
    customRenderer={customRenderer}
    getSelectionKey={getSelectionKey}
    valueMeta={valueMeta}
  />
  );
};

const renderFieldSelector = ({
  controls,
  translations,
  classNames,
  fields,
  level,
  field,
  operator,
  onFieldChanged
}) => {
  return (
    <controls.fieldSelector
      options={fields}
      title={translations.fields.title}
      value={field}
      operator={operator}
      placeHolderTooltip={true}
      className={`rule-fields ${classNames.fields}`}
      handleOnChange={onFieldChanged}
      level={level}
    />
  );
};

const renderParentOperatorSelector = ({
  controls,
  translations,
  classNames,
  fieldData,
  level,
  field,
  parentOpertators,
  parentOperator,
  onParentOperatorChanged
}) => {
  return (
    <controls.parentOperatorSelector
      field={field}
      fieldData={fieldData}
      title={translations.operators.title}
      placeHolderTooltip={true}
      options={parentOpertators}
      value={parentOperator}
      className={`rule-operators ${classNames.operators}`}
      handleOnChange={onParentOperatorChanged}
      level={level}
    />
  );
};

const renderOperatorSelector = ({
  controls,
  translations,
  classNames,
  fieldData,
  level,
  field,
  getOperatorsList,
  operator,
  onOperatorChanged
}) => {
  return (
    <controls.operatorSelector
      field={field}
      fieldData={fieldData}
      title={translations.operators.title}
      placeHolderTooltip={true}
      options={getOperatorsList(field)}
      value={operator}
      className={`rule-operators ${classNames.operators}`}
      handleOnChange={onOperatorChanged}
      level={level}
    />
  );
};

export const Rule: React.FC<RuleProps> = ({
  id,
  parentId,
  field,
  operator,
  parentOperator,
  value,
  valueMeta,
  translations,
  schema: {
    classNames,
    controls,
    fields,
    getInputType,
    getPlaceHolder,
    getLevel,
    getOperators,
    getValueEditorType,
    getValues,
    onPropChange,
    onRuleRemove,
    removeIconatStart,
    customRenderer,
    getSelectionKey
  }
}) => {
  const onElementChanged = (property: string, value: any) => onPropChange(property, value, id);
  const onFieldChanged = (value: any) => onElementChanged('field', value);
  const onOperatorChanged = (value: any) => onElementChanged('operator', value);
  const onParentOperatorChanged = (value: any) => onElementChanged('parentOperator', value);
  const onValueChanged = (value: any) => onElementChanged('value', value);
  const removeRule = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    onRuleRemove(id, parentId);
  };
  const fieldData = arrayFind(fields, (f) => f.name === field);
  const level = getLevel(id);
  const parentOpertators = getOperators(field, true);
  const getOperatorsList = (field) => getOperators(field, false, parentOperator);
  const enableParentOperaton = !!(parentOpertators && parentOpertators.length);
  return (
    <div className={`rule ${classNames.rule}`} data-rule-id={id} data-level={level}>
      {removeIconatStart && renderRemoveRuleAction({ controls, translations, classNames, removeRule, level })}
      {renderFieldSelector({
        controls, translations, classNames, fields, level, field, operator, onFieldChanged
      })}
      {enableParentOperaton &&
        renderParentOperatorSelector({
          controls, translations, classNames, fieldData, level, field, parentOpertators, parentOperator, onParentOperatorChanged
        })}
      {!enableParentOperaton &&
        renderOperatorSelector({
          controls, translations, classNames, fieldData, level, field, getOperatorsList, operator, onOperatorChanged
        })}
      {renderValueEditor({controls, translations, classNames, onValueChanged, field, customRenderer, getSelectionKey, level, fieldData, operator, getValueEditorType, value, getInputType, getPlaceHolder, getValues, valueMeta, parentOperator})}
      
      {enableParentOperaton &&
        renderOperatorSelector({
          controls, translations, classNames, fieldData, level, field, getOperatorsList, operator, onOperatorChanged
        })}
      {!removeIconatStart &&
        renderRemoveRuleAction({ controls, translations, classNames, removeRule, level })}
    </div>
  );
};

Rule.displayName = 'Rule';
