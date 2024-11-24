import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";

const TextWithStyle = styled(Text);
const ViewWithStyle = styled(View);

export function Title({ text, highlights, textColor, highlightColor }) {
  const getHighlightedText = (text, highlights) => {

    const regex = new RegExp(`(${highlights.join('|')})`, 'gi');

    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlights.includes(part.toLowerCase()) ? (
        <ViewWithStyle
          key={index}
          style={{
            backgroundColor: highlightColor,
          }}
          className="rounded-lg"
        >
          <TextWithStyle
            style={{ color: textColor }}
            className="text-3xl font-bold mx-2 rounded-md"
          >
            {part}
          </TextWithStyle>
        </ViewWithStyle>
      ) : (
        <TextWithStyle
          key={index}
          style={{ color: textColor }}
          className="text-3xl font-bold"
        >
          {part}
        </TextWithStyle>
      )
    );
  };

  return (
    <ViewWithStyle className="flex-row flex-wrap justify-center">
      {getHighlightedText(text, highlights)}
    </ViewWithStyle>
  );
}
