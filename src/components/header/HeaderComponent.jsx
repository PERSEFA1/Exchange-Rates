import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Header.css";

export const HeaderComponent = () => {
  return (
    <header className="header-component">
      <Stack>
        <div className="button-section">
          <Button id="button-1" href={"/"} variant="outlined">
            Курсы валют по дате
          </Button>
          <Button id="button-2" href={"/dynamics"} variant="outlined">
            Динамика курса валют
          </Button>
          <Button id="button-3" href={"/converter"} variant="outlined">
            Конвертер валют
          </Button>
        </div>
      </Stack>
    </header>
  );
};
