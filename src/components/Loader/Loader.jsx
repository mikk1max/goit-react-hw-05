import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <Grid
      visible={true}
      height={40}
      width={40}
      color="#003580"
      radius={12.5}
      wrapperStyle={{ justifyContent: "center" }}
    />
  );
};

export default Loader;
