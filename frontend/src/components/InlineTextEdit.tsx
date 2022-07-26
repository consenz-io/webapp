import React, { FC, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IInlineTextEditProps } from 'types';

const InlineTextEdit: FC<IInlineTextEditProps> = ({
  value,
  label,
  maxWidth,
  onChange,
  style = {},
}) => {
  /**
   * Input handling
   */
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(value);
  const getTextareaValue = () => {
    return refTextarea.current?.value || '';
  };
  const onInput = () => {
    setEditingValue(getTextareaValue());
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLTextAreaElement;
      target.blur();
    } else if (event.key === 'Escape') {
      setEditingValue(value);
      const target = event.target as HTMLTextAreaElement;
      target.value = value || '';
      target.blur();
    }
  };
  const onBlur = () => {
    setIsEditing(false);
    const editedValue = getTextareaValue().trim();
    if (editedValue === '') {
      setEditingValue(editedValue);
    } else {
      const isChanged = editedValue !== value;
      setEditingValue(editedValue);
      if (isChanged) onChange(editedValue);
    }
  };
  const onFocus = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    // If our value is changed from on high, update the textarea.
    if (!isEditing && value !== editingValue) {
      setEditingValue(value);
    }
  }, [value, editingValue, isEditing]);

  /**
   * Dynamic box resizing
   */
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const measuringBox = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMeasuring(true);
  }, [editingValue, isEditing, maxWidth]);

  useLayoutEffect(() => {
    if (isMeasuring && measuringBox?.current) {
      const rect = measuringBox.current.getBoundingClientRect();
      setWidth(rect.width > maxWidth ? maxWidth : Math.ceil(rect.width));
      setHeight(Math.ceil(rect.height) + 2); // These two extra pixels prevent internal scrolling. I don't understand why.
      setIsMeasuring(false);
    }
  }, [editingValue, isEditing, isMeasuring, maxWidth]);

  /**
   * LTR/RTL handling
   */
  const theme = useTheme();

  return (
    <div style={{ maxWidth: maxWidth, display: 'inline-block', direction: theme.direction }}>
      <span
        ref={measuringBox}
        style={{
          boxSizing: 'border-box',
          display: 'inline-block',
          whiteSpace: 'break-spaces',
          ...style,
        }}
      >
        {
          isMeasuring &&
            (theme.direction === 'ltr'
              ? isEditing
                ? `${editingValue} W`
                : `${value}.`
              : isEditing
              ? `${editingValue} ף`
              : `${value}ו`)
          /* trailing characters ensure the textarea sizing is adequately padded */
        }
      </span>
      {(!isMeasuring || isEditing) && (
        <textarea
          ref={refTextarea}
          rows={1}
          aria-label={label}
          title={label}
          value={editingValue}
          onInput={onInput}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
          wrap="soft"
          style={{
            margin: 0,
            width: width,
            height: height,
            background: 'none',
            border: 'none',
            outline: 'none',
            padding: 0,
            resize: 'none',
            overflow: 'hidden',
            color: isEditing ? '#fff' : '#f2f2f2',
            fontFamily: theme.typography.fontFamily,
            ...style,
          }}
        />
      )}
    </div>
  );
};

export default InlineTextEdit;
