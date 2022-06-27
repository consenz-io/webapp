import { MainWelcome, ContentWrapper, Content } from "./style";

const Welcome = () => {
  return (
    <MainWelcome>
      <ContentWrapper>
        <h3>Welcome To Consenz</h3>
        <Content>
          <p>
            You are not part of a Group yet,
            <br /> ask your Group Manager to invite you to join and have fun!
          </p>
        </Content>
      </ContentWrapper>
    </MainWelcome>
  );
};

export default Welcome;
