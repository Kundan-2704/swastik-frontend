import {
    Box,
    Grid,
    Paper,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import {
    ShoppingBag,
    Store,
    People,
    CurrencyRupee,
    PendingActions,
    Checkroom,
    ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ================= SMALL REUSABLE CARD ================= */

type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <Paper
        elevation={0}
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{
            background: "#FFFCF7",
            border: "1px solid #E3D4B6",
        }}
    >
        <div>
            <Typography variant="body2" className="text-[#7A6A58]">
                {title}
            </Typography>
            <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
                {value}
            </Typography>
        </div>
        <div className="text-[#B9935A]">{icon}</div>
    </Paper>
);

/* ================= DASHBOARD ================= */

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <Box className="bg-[#FFFDF9] min-h-screen">
            {/* ===== HEADER ===== */}
            <Box className="mb-6">
                <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
                    Dashboard
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                    Overview of your handloom marketplace
                </Typography>
            </Box>

            {/* ===== KPI CARDS ===== */}
            <Grid container spacing={3}>
                <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Orders"
                        value="1,248"
                        icon={<ShoppingBag fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Revenue"
                        value="₹ 12,45,600"
                        icon={<CurrencyRupee fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Active Sellers"
                        value="86"
                        icon={<Store fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Customers"
                        value="3,420"
                        icon={<People fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Pending Orders"
                        value="32"
                        icon={<PendingActions fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Live Sarees"
                        value="412"
                        icon={<Checkroom fontSize="large" />}
                    />
                </Grid>

                <Grid sx={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        title="Approval Requests"
                        value="14"
                        icon={<PendingActions fontSize="large" />}
                    />
                </Grid>
            </Grid>

            {/* ===== ACTION REQUIRED ===== */}
            <Paper
                elevation={0}
                className="rounded-2xl mt-8 p-6"
                style={{
                    background: "#FFFCF7",
                    border: "1px solid #E3D4B6",
                }}
            >
                <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
                    Action Required
                </Typography>

                <Divider className="my-4" />

                <div className="space-y-3 text-sm text-[#4A1F2A]">
                    <div className="flex justify-between items-center">
                        <span>🔴 5 sellers pending KYC approval</span>
                        <Button
                            size="small"
                            endIcon={<ArrowForward />}
                            onClick={() => navigate("/admin/sellers/approval")}
                        >
                            Review
                        </Button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span>🔴 14 sarees pending product approval</span>
                        <Button
                            size="small"
                            endIcon={<ArrowForward />}
                            onClick={() => navigate("/admin/products")}
                        >
                            Review
                        </Button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span>🟡 12 sarees running low on stock</span>
                        <Button
                            size="small"
                            endIcon={<ArrowForward />}
                            onClick={() => navigate("/admin/inventory")}
                        >
                            View
                        </Button>
                    </div>
                </div>
            </Paper>

            {/* ===== QUICK INSIGHTS ===== */}
            <Paper
                elevation={0}
                className="rounded-2xl mt-8 p-6"
                style={{
                    background: "#FFFCF7",
                    border: "1px solid #E3D4B6",
                }}
            >
                <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
                    Quick Insights
                </Typography>

                <Divider className="my-4" />

                <ul className="space-y-2 text-sm text-[#4A1F2A]">
                    <li>• Kosa Sarees generated highest revenue this month</li>
                    <li>• Wedding saree demand increased by 18%</li>
                    <li>• COD orders account for 62% of total orders</li>
                    <li>• Top 5 sellers contributed 41% of total sales</li>
                </ul>
            </Paper>
        </Box>
    );
};

export default AdminDashboard;
