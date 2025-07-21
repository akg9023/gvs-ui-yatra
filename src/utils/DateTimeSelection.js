import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function DateTimeSelection(props) {
    const minArrival = dayjs('2025-09-07T04:00');
    const maxArrival = dayjs('2025-09-11T20:00');
    const minDepart = dayjs('2025-09-08T00:00');
    const maxDepart = dayjs('2025-09-13T10:00');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    width: {
                        xs: '90%', 
                        sm: '70%',  
                        md: 400     
                    },
                    maxWidth: 400,
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Accommodation Dates
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    <DateTimePicker
                        label="Arrival"
                        value={props.arrDate}
                        onChange={(newValue) => {
                            const formatted = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                            props.onArrivalUpdate(formatted);
                        }}
                        minDateTime={minArrival}
                        maxDateTime={maxArrival}
                        slotProps={{
                            textField: {
                                size: 'small',
                                variant: 'outlined',
                                fullWidth: true
                            },
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 4],
                                        },
                                    },
                                ],
                            }
                        }}
                    />

                    <DateTimePicker
                        label="Departure"
                        value={props.depDate}
                        onChange={(newValue) => {
                            const formatted = dayjs(newValue).format('YYYY-MM-DDTHH:mm');
                            props.onDepartureUpdate(formatted);
                        }}
                        minDateTime={minDepart}
                        maxDateTime={maxDepart}
                        slotProps={{
                            textField: {
                                size: 'small',
                                variant: 'outlined',
                                fullWidth: true
                            },
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 4],
                                        },
                                    },
                                ],
                            }
                        }}
                    />
                </Box>
            </Paper>
        </LocalizationProvider>
    );
}
