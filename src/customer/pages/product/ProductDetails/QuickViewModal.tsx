import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
    Button,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    AddShoppingCart,
    CheckCircle,
} from "@mui/icons-material";

import { useAppDispatch } from "../../../../Redux Toolkit/Store";
import { addItemToCart } from "../../../../Redux Toolkit/Features/Customer/CartSlice";

interface QuickViewModalProps {
    product: any;
    onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
    product,
    onClose,
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const imageRef = useRef<HTMLImageElement | null>(null);

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });

    if (!product) return null;

    /* ================= UX ================= */
    useEffect(() => {
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", esc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", esc);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    /* ================= FLY TO CART (ROBUST) ================= */
    const flyToCart = () => {
        const img = imageRef.current;
        const cartIcon = document.getElementById("cart-icon");

        if (!img || !cartIcon) {
            console.warn("Fly skipped: missing elements");
            return;
        }

        const imgRect = img.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const flyingImg = img.cloneNode(true) as HTMLImageElement;

        

        flyingImg.style.position = "fixed";
        flyingImg.style.left = `${imgRect.left}px`;
        flyingImg.style.top = `${imgRect.top}px`;
        flyingImg.style.width = `${imgRect.width}px`;
        flyingImg.style.height = `${imgRect.height}px`;
        flyingImg.style.borderRadius = "12px";
        flyingImg.style.pointerEvents = "none";
        flyingImg.style.zIndex = "2147483647"; // 🔥 MAX
        flyingImg.style.transform = "translate(0, 0) scale(1)";
        flyingImg.style.transition =
            "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s";

        document.body.appendChild(flyingImg);

        const translateX =
            cartRect.left + cartRect.width / 2 -
            (imgRect.left + imgRect.width / 2);

        const translateY =
            cartRect.top + cartRect.height / 2 -
            (imgRect.top + imgRect.height / 2);

        requestAnimationFrame(() => {
            flyingImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.25)`;
            flyingImg.style.opacity = "0.6";
        });


        setTimeout(() => {
            flyingImg.remove();
        }, 900);
    };


    /* ================= ADD TO CART ================= */
    const handleAddToCart = async () => {
        if (adding || added) return;

        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            setToast({
                open: true,
                message: "Please login to add items to cart",
                severity: "error",
            });
            return;
        }

        try {
            setAdding(true);

            await dispatch(
                addItemToCart({
                    jwt,
                    request: {
                        productId: product._id,
                        quantity: 1,
                        size: product.sizes?.[0] || "S",
                    },
                })
            ).unwrap();

            flyToCart(); // 🚀 animation first

            setAdded(true);
            setToast({
                open: true,
                message: "Added to cart",
                severity: "success",
            });

            setTimeout(() => {
                setAdded(false);
                onClose();
            }, 1200);
        } catch {
            setToast({
                open: true,
                message: "Failed to add item to cart",
                severity: "error",
            });
        } finally {
            setAdding(false);
        }
    };

    /* ================= VIEW DETAILS ================= */
    const handleViewDetails = () => {
        navigate(
            `/product-details/${product.category}/${product.title}/${product._id}`
        );
        onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FDF9F2] rounded-2xl w-[92%] md:w-[820px] max-h-[90vh] overflow-y-auto relative shadow-xl"
            >
                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-black/5 transition text-[#4A1F2A]"
                >
                    ✕
                </button>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* IMAGE */}
                    <img
                        ref={imageRef}
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-full h-[420px] object-cover rounded-xl"
                    />

                    {/* DETAILS */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#4A1F2A]">
                            {product.title}
                        </h2>

                        <p className="text-sm text-[#6A5B4A] line-clamp-4">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[#4A1F2A]">
                                ₹{product.sellingPrice}
                            </span>
                            {product.mrpPrice && (
                                <span className="line-through text-gray-400">
                                    ₹{product.mrpPrice}
                                </span>
                            )}
                        </div>

                        <div className="text-xs text-[#8A7A66] space-y-1">
                            <p>✔ Handwoven by skilled artisans</p>
                            <p>✔ Authentic Indian handloom</p>
                        </div>

                        <div className="border-t border-[#E3D4B6] pt-4  flex gap-3 ">
                            <Button
                                fullWidth
                                startIcon={
                                    added ? (
                                        <CheckCircle />
                                    ) : adding ? (
                                        <CircularProgress size={18} color="inherit" />
                                    ) : (
                                        <AddShoppingCart />
                                    )
                                }
                                onClick={handleAddToCart}
                                disabled={adding || added}
                                variant="contained"
                                className={added ? "added-animate" : ""}
                                sx={{
                                    py: "0.9rem",
                                    borderRadius: "999px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    backgroundColor: added ? "#2E7D32" : "#4A1F2A",
                                }}
                            >
                                {added
                                    ? "Added to Cart"
                                    : adding
                                        ? "Adding..."
                                        : "Add to Bag"}
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleViewDetails}
                                sx={{
                                    py: "0.9rem",
                                    borderRadius: "999px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderColor: "#4A1F2A",
                                    color: "#4A1F2A",
                                }}
                            >
                                View Full Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST */}
            <Snackbar
                open={toast.open}
                autoHideDuration={2500}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={toast.severity} sx={{ width: "100%" }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </div>,
        document.body
    );
};

export default QuickViewModal;
