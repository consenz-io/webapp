import {
  MainWelcome,
  ContentWrapper,
  Content,
  ContentLine,
  ConsenzSymbol,
} from "./style";
import "./Welcome.css";

const Welcome = () => {
  return (
    <MainWelcome>
      <ConsenzSymbol>consenz</ConsenzSymbol>
      <ContentWrapper>
        <h3>Welcome To Consenz!</h3>
        <Content>
          <ContentLine>You are not part of a Group yet,</ContentLine>
          <ContentLine>
            ask your Group Manager to invite you to join
          </ContentLine>
          <ContentLine>and have fun!</ContentLine>
        </Content>
      </ContentWrapper>
    </MainWelcome>
  );
};

export default Welcome;
