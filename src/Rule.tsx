import arrayFind from 'array-find';
import React from 'react';
import { RuleProps } from './types';

export const Rule: React.FC<RuleProps> = ({
  id,
  parentId,
  field,
  operator,
  value,
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
    showAddGroup
  }
}) => {
  const onElementChanged = (property: string, value: any) => {
    onPropChange(property, value, id);
  };

  const onFieldChanged = (value: any) => {
    onElementChanged('field', value);
  };

  const onOperatorChanged = (value: any) => {
    onElementChanged('operator', value);
  };

  const onValueChanged = (value: any) => {
    onElementChanged('value', value);
  };

  const removeRule = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    onRuleRemove(id, parentId);
  };

  const fieldData = arrayFind(fields, (f) => f.name === field);
  const level = getLevel(id);
  const valueEditorType = getInputType(field, operator);
  let ruleCls = "rule-column-3";
  if(operator === 'null' || operator === 'notNull' || valueEditorType === "none") {
    ruleCls = "rule-column-2";
  }
  return (
    <div className={`rule ${ruleCls} ${classNames.rule}`} data-rule-id={id} data-level={level}>
     {!showAddGroup && <controls.removeRuleAction
        label={translations.removeRule.label}
        title={translations.removeRule.title}
        className={`rule-remove ${classNames.removeRule}`}
        handleOnClick={removeRule}
        level={level}
      />}
     
      <controls.fieldSelector
        options={fields}
        title={translations.fields.title}
        value={field}
        operator={operator}
        className={`rule-fields ${classNames.fields}`}
        handleOnChange={onFieldChanged}
        level={level}
      />
    
      <controls.operatorSelector
        field={field}
        fieldData={fieldData}
        title={translations.operators.title}
        options={getOperators(field)}
        value={operator}
        className={`rule-operators ${classNames.operators}`}
        handleOnChange={onOperatorChanged}
        level={level}
      />
      <controls.valueEditor
        field={field}
        fieldData={fieldData}
        title={translations.value.title}
        operator={operator}
        value={value}
        type={getValueEditorType(field, operator)}
        inputType={getInputType(field, operator)}
        placeHolder={getPlaceHolder(field, operator)}
        values={getValues(field, operator)}
        className={`rule-value ${classNames.value}`}
        handleOnChange={onValueChanged}
        level={level}
      />
      {showAddGroup && <controls.removeRuleAction
        label={translations.removeRule.label}
        title={translations.removeRule.title}
        className={`rule-remove ${classNames.removeRule}`}
        handleOnClick={removeRule}
        level={level}
      />}
     
    </div>
  );
};

Rule.displayName = 'Rule';
