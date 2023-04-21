import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

const SearchFilter = (props: IProps): JSX.Element => {
    const { query, setQuery } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    borderRadius: '4px',
                    padding: '8px 16px 8px 0',
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        padding: '0px 16px',
                        pointerEvents: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SearchIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                        }}
                    />
                </Box>
                <InputBase
                    placeholder="Search"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />
            </Box>
        </Box>
    );
};

export default SearchFilter;

interface IProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}
