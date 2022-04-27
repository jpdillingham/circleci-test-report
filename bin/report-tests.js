const axios = require("axios");

const { CIRCLE_BUILD_NUM, PERSONAL_CIRCLECI_TOKEN } = process.env;

if (!CIRCLE_BUILD_NUM || !PERSONAL_CIRCLECI_TOKEN) {
  console.error(
    "no CIRCLE_BUILD_NUM or PERSONAL_CIRCLECI_TOKEN envar(s), check env or set pior to run"
  );
}

(async () => {
  console.log("Fetching test report for build #", CIRCLE_BUILD_NUM);

  try {
    const response = await axios.get(
      `https://circleci.com/api/v1.1/project/github/jpdillingham/circleci-test-report/${CIRCLE_BUILD_NUM}/tests`,
      {
        headers: {
          "circle-token": PERSONAL_CIRCLECI_TOKEN,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response);
  }
})();
