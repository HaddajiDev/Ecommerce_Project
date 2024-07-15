import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PricingSlider = ({ onChange, priceRange }) => {
    const [minValue, setMinValue] = useState(priceRange[0]);
    const [maxValue, setMaxValue] = useState(priceRange[1]);

    useEffect(() => {
        setMinValue(priceRange[0]);
        setMaxValue(priceRange[1]);
    }, [priceRange]);

    const handleMinSliderChange = (value) => {
        setMinValue(value);
        onChange([value, maxValue]);
    };

    const handleMaxSliderChange = (value) => {
        setMaxValue(value);
        onChange([minValue, value]);
    };

    const handleMinInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setMinValue(value);
            onChange([value, maxValue]);
        }
    };

    const handleMaxInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setMaxValue(value);
            onChange([minValue, value]);
        }
    };

    return (
        <div className='mt-5' style={{ width: '250px' }}>
            <h5>Pricing Range</h5>            

            <div className='mt-3'>                
                <Slider
                    min={priceRange[0]}
                    max={maxValue}
                    value={minValue}
                    onChange={handleMinSliderChange}
                />
            </div>

            <div className='mt-3'>
                <Slider
                    min={minValue}
                    max={priceRange[1]}
                    value={maxValue}
                    onChange={handleMaxSliderChange}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <InputGroup>
                    <FormControl
                        type="number"
                        value={minValue}
                        onChange={handleMinInputChange}
                    />
                </InputGroup>
                <span style={{ padding: '10px' }}> - </span>
                <InputGroup>
                    <FormControl
                        type="number"
                        value={maxValue}
                        onChange={handleMaxInputChange}
                    />
                </InputGroup>
            </div>
        </div>
    );
};

export default PricingSlider;
