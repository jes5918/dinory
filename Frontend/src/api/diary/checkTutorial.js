const Token =
  'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJzdWVtaW4xIiwiZXhwIjoxNjE3NzcwMjQyLCJlbWFpbCI6InBvcG9wMDkwOTBAbmF2ZXIuY29tIn0.NjNEuTXianJ1lQ2SzsyxV6uZgELGTM1236DVw76MtE4';

// 일기작성 여부 확인
export function didTutorial(child) {
  fetch(`http://j4b105.p.ssafy.io/notes/tutorial/?child=${child}`, {
    headers: {
      Authorization: Token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.tutorial;
    });
}
