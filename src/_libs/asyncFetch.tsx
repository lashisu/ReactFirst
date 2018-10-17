export default async function asyncFetch(
  url: string,
  okHandler: any,
  notOkHandler: any,
  errorHandler: any
) {
  await fetch(url, {
    headers: {
      Accept: "application/json", // This is set on request
      Authorization:
        "ReactWallet 8DZgYqoWepehXBvhQRds5RJGyrvmpt:952F35AB5C10C9A14AF2545330C71CD7358B595C5A81F65B73E6274307D833180E456E25884A2585E661D147C9A998F142E012CE6A9F2FD920B09FE189DE35D4:1535424914",
      Cache: "no-cache", // This is set on request
      "Content-Type": "application/json" // This is set on request
    },
    method: "GET",
    redirect: "follow"
  })
    .then((response: any) => {
      if (response.ok !== true || response.status !== 200) {
        notOkHandler(response);
      } else {
        response.json().then(
          (data: any) => {
            okHandler(data);
          },
          (error: any) => {
            errorHandler(error);
          }
        );
      }
    })
    .catch((error: any) => {
      errorHandler(error);
    });
}
