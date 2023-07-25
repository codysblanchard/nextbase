const fetcher2 = (args) =>
  fetch(args).then(async (res) => {
    if (!res.ok) {
      const status = await res.json();
      const error = new Error(status?.message);
      throw error;
    } else return res.json();
  });
export default fetcher2;

async function fetcher({
  url,
  args,
  loading,
  setError,
}: {
  url: string;
  args?: any;
  loading?: Function;
  setError?: Function;
}) {
  loading && loading(true);
  setError && setError("");
  return new Promise(async (resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    })
      .then((res) => {
        return res.json().catch((e) => {}); //catch empty response json parse error
      })
      .then((res) => {
        loading && loading(false);
        if (res?.error) {
          setError && setError(res.error);
          reject(res.message || res.fields || "Unknown error");
        } else resolve(res);
      })
      .catch((error) => {
        loading && loading(false);
        reject(error.message);
      });
  });
}
