const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

export async function loginAttempt(login: string, password: string) {
  await wait(1000);

  if (login === "doug" && password === "doug") {
    return "success";
  } else {
    throw "Wrong login or password";
  }
}
