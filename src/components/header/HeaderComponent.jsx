import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./Header.css";

export const HeaderComponent = () => {
  return (
    <header className="header-component">
      <Stack>
        <div className="Button-section">
          <Button id="Button-1" href={"/"} variant="outlined">
            Курсы валют по дате
          </Button>
          <Button id="Button-2" href={"/dynamics"} variant="outlined">
            Динамика курса валют
          </Button>
          <Button id="Button-3" href={"/converter"} variant="outlined">
            Конвертер валют
          </Button>
        </div>
      </Stack>
    </header>
  );
};
