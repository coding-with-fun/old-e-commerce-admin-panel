import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import {
    type GridRenderCellParams,
    type GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ToggleAdminActivationAPI } from '../../../../apis/admin';
import toast from '../../../../libs/toast';
import _ from 'lodash';

const ActivationSwitch = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
): JSX.Element => {
    const [isActive, setIsActive] = useState<boolean>(Boolean(params.value));

    const { mutate, isLoading } = useMutation({
        mutationFn: ToggleAdminActivationAPI,
        onSuccess(data) {
            setIsActive((prevState) => {
                return !prevState;
            });
            toast(_.get(data, 'message', ''), 'success');
        },
    });

    const handleToggleSwitch = (): void => {
        mutate({
            adminId: params.row._id,
        });
    };

    return isLoading ? (
        <CircularProgress
            size={20}
            sx={{
                ml: 2.5,
            }}
        />
    ) : (
        <Switch
            checked={isActive}
            disabled={params.row.isSuperAdmin}
            onChange={handleToggleSwitch}
        />
    );
};

export default ActivationSwitch;
