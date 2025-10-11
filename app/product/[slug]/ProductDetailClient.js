// app/components/ProductDetailClient.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/app/components/AddToCartButton";
import { Buybtn } from "@/app/components/Buybtn";

export default function ProductDetailClient({ product }) {
  // images array fallback
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : product.image
    ? [product.image]
    : ["https://via.placeholder.com/800x800?text=No+Image"];

  const [mainIndex, setMainIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [shareUrl, setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // set share url on client
    if (typeof window !== "undefined") setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    // keep qty in valid range
    if (product?.stock != null) {
      if (qty > product.stock) setQty(product.stock);
      if (qty < 1) setQty(1);
    }
  }, [qty, product?.stock]);

  const mrp = Number(product.mrp) || 0;
  const price = Number(product.price) || 0;
  const discountPercent =
    mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const formatINR = (n) =>
    typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : "—";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      // small UI feedback — simple alert so no extra libs
      alert("Link copied to clipboard.");
    } catch {
      alert("Could not copy link.");
    }
  };

  return (
    <article className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 shadow-md">
      {/* LEFT: Image gallery */}
      <div className="space-y-4">
        <div className="relative h-[60vh] md:h-[70vh] bg-gray-50 rounded-lg border overflow-hidden flex items-center justify-center">
          {/* small "view" button */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute right-3 top-3 z-20 bg-white/90 px-3 py-1 rounded-full text-sm shadow"
            aria-label="Open large view"
          >
            View
          </button>

          <Image
            src={images[mainIndex]}
            alt={`${product.name} image ${mainIndex + 1}`}
            width={1200}
            height={1200}
            className="object-contain max-h-full"
            unoptimized
            priority
          />
        </div>

        {/* thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setMainIndex(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border ${
                  i === mainIndex ? "ring-2 ring-purple-600" : "border-gray-200"
                }`}
                aria-label={`Show image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`thumb ${i + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        {/* modal: large view */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-4xl bg-white rounded-lg p-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-3 top-3 bg-gray-100 rounded-full p-2"
                aria-label="Close"
              >
                ✕
              </button>
              <Image
                src={images[mainIndex]}
                alt={`${product.name} large`}
                width={1600}
                height={1600}
                className="object-contain w-full h-[80vh]"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Info, actions */}
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 capitalize">
              {product.category} • {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-600">{product.mainDes}</p>
          </div>

          <div className="text-right">
            {mrp > 0 && (
              <div className="text-sm text-gray-400 line-through">{formatINR(mrp)}</div>
            )}
            <div className="text-2xl md:text-3xl font-bold">{formatINR(price)}</div>
            {discountPercent > 0 && (
              <div className="mt-2 inline-block text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                -{discountPercent}%
              </div>
            )}
          </div>
        </div>

        {/* stock + seller */}
        <div className="mt-4 flex items-center gap-6">
          <div>
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                In stock • {product.stock} available
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of stock</span>
            )}
          </div>
          <div className="text-sm text-gray-500">Seller: {product.admin || "—"}</div>
        </div>

        {/* qty + buttons */}
        <div className="mt-6 flex items-center gap-4">
          {/* quantity selector */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <div className="px-4 py-2 font-medium min-w-[3rem] text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => Math.min(product.stock || 9999, q + 1))}
              className="px-3 py-2 text-lg"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* actions (uses your existing components) */}
          <div className="flex gap-3">
            <AddToCartButton productId={product._id} quantity={qty} />
            <Buybtn productId={product._id} quantity={qty} />
          </div>
        </div>

        {/* product details / spec */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Product details</h2>

          {Array.isArray(product.more) && product.more.length > 0 ? (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700 mt-3">
              {product.more.map((m, idx) => (
                <React.Fragment key={idx}>
                  <dt className="font-medium">{m.label}</dt>
                  <dd>{m.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No additional product details.</p>
          )}
        </div>

        {/* share / copy */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 border rounded text-sm"
            aria-label="Copy product link"
          >
            Copy link
          </button>

          {shareUrl && (
            <>
              <Link
                className="px-3 py-2 border rounded text-sm"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share
              </Link>
            </>
          )}
        </div>
      </div>

      {/* sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t p-3 flex items-center justify-between z-40">
        <div>
          <div className="text-xs text-gray-500">Total</div>
          <div className="font-semibold">{formatINR(price * qty)}</div>
        </div>
        <div className="flex gap-2">
          <AddToCartButton productId={product._id} quantity={qty} />
          <Buybtn productId={product._id} quantity={qty} />
        </div>
      </div>
    </article>
  );
}
