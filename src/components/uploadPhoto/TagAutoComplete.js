import {useQuery} from "@apollo/client";
import {GET_ALL_TAGS} from "../../graphql/Queries";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import {Autocomplete, Chip, createFilterOptions, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

const filter = createFilterOptions();

export const TagAutoComplete = ({value, setValue}) => {
    const {loading: allTagsLoading, error: allTagsError, data: allTagsData} = useQuery(GET_ALL_TAGS);
    if (allTagsLoading) return <Loading/>
    if (allTagsError) return <QueryError errorMessage={allTagsError}/>

    const allTags = allTagsData?.getTags.edges;

    return (
        <Autocomplete
            sx={{mr: 1}}
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({name: newValue,});
                } else if (newValue && newValue.inputValue) {
                    setValue({name: newValue.inputValue,});
                } else {
                    setValue(newValue);
                }
            }}

            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                    });
                }
                return filtered;
            }}

            multiple
            id="tags-filled"
            options={allTags.map(tag => ({name: tag.node.name, photoCount: tag.node.photoCount}))}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography component="div" sx={{
                        m: 1, display: "inline-flex", verticalAlign: 'center',
                        fontFamily: 'BlinkMacSystemFont',
                        fontWeight: 'medium',
                        fontSize: 14
                    }}>
                        {option.name}
                        {option.photoCount && <Avatar sx={{ml: 1, fontSize: 12, height: 20, width: 20}}>
                            {option.photoCount}</Avatar>}
                    </Typography>
                </li>
            )}
            // getOptionLabel={(option) => option.name}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    let tagLabel;
                    if (typeof option === 'string') {
                        tagLabel = option;
                    }else if (option.inputValue) {
                        tagLabel = option.inputValue;
                    }else {
                        tagLabel = option.name;
                    }
                    return (<Chip variant="outlined" label={tagLabel}
                                  {...getTagProps({ index })} />)
                })
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Add your tags..."
                    InputProps={{...params.InputProps, sx: {height: 1, p: 0, ml: 1, mt: 0, mr: 0}}}
                />
            )}
        />
    )
}